export const productDTO = (productData) => {
    return {
        id: productData._id,
        title: productData.title,
        author: productData.author,
        image: productData.image,
        published: productData.published,
        pages : productData.pages,
        status: productData.status,
        userId: productData.userId
    }
}