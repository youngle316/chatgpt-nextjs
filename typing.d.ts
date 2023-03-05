interface Message {
  parentMessageId?: string;
  text: string;
  createAt: admin.firestore.Timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}
