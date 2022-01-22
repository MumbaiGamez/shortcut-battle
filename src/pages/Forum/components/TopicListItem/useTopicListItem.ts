import { useState } from 'react';

import { useNavigate } from 'react-router';

export const useTopicListItem = (id: number) => {
  const [isOpen, setIsOpen] = useState(false);

  const switchTextView = () => {
    setIsOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const openTopicPage = () => {
    navigate(id);
  };

  return { isOpen, switchTextView, openTopicPage };
};
