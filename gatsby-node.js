const Promise = require(`bluebird`)
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const categoryPage = path.resolve(`./src/templates/category-page.js`)
    const productPage = path.resolve(`./src/templates/product-page.js`)
    const trainingPage = path.resolve(`./src/templates/training-page.js`)
    resolve(
      graphql(
        `
          {
            allContentfulProduct {
              edges {
                node {
                  id
                  slug
                  title {
                    title
                  }
                  category {
                    id
                    slug
                  }
                  createdAt
                }
              }
            }

            allContentfulCategory {
              edges {
                node {
                  id
                  slug
                  createdAt
                }
              }
            }

            allContentfulTraining {
              edges {
                node {
                  id
                  slug
                  createdAt
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create product pages.
        result.data.allContentfulProduct.edges.forEach(edge => {
          createPage({
            path: `/categories/${edge.node.category.slug}/` + edge.node.slug,
            component: productPage,
            context: {
              slug: edge.node.slug,
            },
          })
        })

        // Create category pages.
        result.data.allContentfulCategory.edges.forEach(edge => {
          createPage({
            path: `/categories/` + edge.node.slug,
            component: categoryPage,
            context: {
              slug: edge.node.slug,
            },
          })
        })

        // Create training pages.
        result.data.allContentfulTraining.edges.forEach(edge => {
          createPage({
            path: `/trainings/` + edge.node.slug,
            component: trainingPage,
            context: {
              slug: edge.node.slug,
            },
          })
        })
        return
      })
    )
  })
}
