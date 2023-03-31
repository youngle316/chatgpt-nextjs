interface Message {
  prompt?: string;
  fireBaseMessageID?: string;
  isLoading?: boolean;
  parentMessageId?: string;
  text: string;
  createAt?: admin.firestore.Timestamp;
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

interface Prompt {
  title: string;
  des: string;
  content: string;
  source: string;
  type?: 'custom' | 'default';
  createAt?: admin.firestore.Timestamp;
}

interface Prompts {
  type: 'en' | 'cn';
  address: string;
  prompts: Prompt[];
}
