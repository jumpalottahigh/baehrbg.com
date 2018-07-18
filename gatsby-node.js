const Promise = require(`bluebird`)
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const productPage = path.resolve(`./src/templates/product-page.js`)
    const categoryPage = path.resolve(`./src/templates/category-page.js`)
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
                  createdAt
                }
              }
            }

            allContentfulCategory {
              edges {
                node {
                  id
                  slug
                  title
                  description
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
            path: `/products/` + edge.node.slug,
            component: productPage,
            context: {
              slug: edge.node.slug,
            },
          })
        })

        // Create product pages.
        result.data.allContentfulCategory.edges.forEach(edge => {
          createPage({
            path: `/categories/` + edge.node.slug,
            component: categoryPage,
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
