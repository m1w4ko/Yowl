
export interface IReviews {
    map(arg0: (item: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    color?: string | null;
    avatar?: string | null;
    lastname?: string;
    firstname?: string;
    review_id?: number,
    id?: number,
    business_id: number,
    user_id?: number,
    rating?: number,
    title?: string,
    content?: string | null,
    createdAt?: number,
    category_id?: number,
    verified?: string,
    likes: number,
    dislikes: number
}
