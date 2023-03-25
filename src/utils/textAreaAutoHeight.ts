const textAreaAutoHeight = (id: string) => {
  const textArea = document.getElementById(id) as HTMLTextAreaElement;
  if (textArea) {
    textArea.style.height = '24px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
};

export default textAreaAutoHeight;
