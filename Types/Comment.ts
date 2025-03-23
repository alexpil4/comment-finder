export interface Comment {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
}

export interface CommentPreviewProps {
  body: string;
  query: string;
}
