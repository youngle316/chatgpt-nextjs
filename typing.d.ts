interface Message {
  id?: string;
  text: string;
  createAt: admin.firestore.Timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}
