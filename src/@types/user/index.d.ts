type User = {
    id: string;
    name: string;
    login: string;
    // eslint-disable-next-line camelcase
    avatar_url: string;
    // eslint-disable-next-line camelcase
    github_id: number;

    currentSocketId?: string;
};

export { User };
