interface Message {
  prompt?: string;
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

interface ChatContent {
  title: string;
  message: any[];
  userId: string;
  createAt: any;
}
