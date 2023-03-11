// scrolls the element's ancestor containers is visible to the user.
export const useScrollToView = (ref: any) => {
  const scrollToView = () => {
    ref.current && ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return scrollToView;
};
