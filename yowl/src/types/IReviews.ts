export interface IReviews {
    review_id: number,
    id: number,
    business_id: number,
    user_id: number,
    rating: number,
    title: string,
    content: string,
    createdAt: number,
    category_id: number,
    verified: string,
    likes: number,
    dislikes: number
}