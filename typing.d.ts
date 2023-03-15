interface Message {
  fireBaseMessageID?: string;
  isLoading?: boolean;
  parentMessageId?: string;
  text: string;
  createAt: admin.firestore.Timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}
