const Promise = require(`bluebird`)
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const productPage = path.resolve(`./src/templates/product-page.js`)
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
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        result.data.allContentfulProduct.edges.forEach(edge => {
          createPage({
            path: `/products/` + edge.node.slug,
            component: productPage,
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
