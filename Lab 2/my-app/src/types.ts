export enum Label {
    personal = "personal",
    school = "school",
    work = "work",
    other = "other",
}

export type Note = {
    id: number;
    title: string;
    content: string;
    label: Label;
};