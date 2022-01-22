import { useParams } from 'react-router';
import { useGetTopicByIdQuery } from '@redux/api/forumApi';

export const useTopic = () => {
  const { id } = useParams();

  const { data: topic, isLoading } = useGetTopicByIdQuery(id);

  return { topic, isLoading };
};
