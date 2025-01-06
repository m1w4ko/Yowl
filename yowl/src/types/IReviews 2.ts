export interface IReviews {
    map(arg0: (item: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
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