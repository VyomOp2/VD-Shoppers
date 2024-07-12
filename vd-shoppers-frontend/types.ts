export interface Billboard {
    id : string;
    label : string;
    imageURL : string;
};

export interface Category {
    id : string;
    name : string;
    billboard : Billboard;
};
