export type Message = {
    // eslint-disable-next-line camelcase
    created_at: string;
    text: string;
    user: User;
    userId: string;
};

type User = {
    // eslint-disable-next-line camelcase
    avatar_url: string;
    name?: string;
    id: string;
    login: string;
};
