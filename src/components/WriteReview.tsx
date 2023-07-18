import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import {
  useGetReviewsQuery,
  useGetSingleBookQuery,
  usePostReviewMutation,
} from '../redux/features/books/bookApi';

export type IBookReview = {
  bookId: string;
  reviewer: string;
  rating: number;
  content: string;
};

export const WriteReview = ({ bookId }: { bookId: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBookReview>();

  const { refetch } = useGetSingleBookQuery(bookId as string, {
    // pollingInterval: 5000,
    refetchOnMountOrArgChange: true,
  });

  // const { data, refetch } = useGetReviewsQuery(bookId, {
  //   refetchOnMountOrArgChange: true,
  // });
  // console.log(data);
  // const reviews = data?.data?.reviews;

  const [postReview, { isLoading, isError, isSuccess }] =
    usePostReviewMutation();
  const onSubmit = async (formData: IBookReview) => {
    const payload = {
      id: bookId,
      data: formData,
    };
    postReview(payload)
      .then((response) => {
        if ('data' in response) {
          refetch();
          toast(response.data?.message);
        } else {
          toast('Something went wrong');
        }
      })
      .catch((err) => {
        console.log(err);
        toast(err?.message);
      })
      .finally(() => {
        reset();
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        type="hidden"
        readOnly
        defaultValue={bookId}
        {...register('bookId', {
          required: 'book id cannot be empty',
        })}
      />
      <input
        type="text"
        placeholder="your name"
        className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
        {...register('reviewer', {
          required: 'Please enter your name',
        })}
      />
      {errors.reviewer && <p>{errors.reviewer.message}</p>}
      <input
        type="number"
        placeholder="rating"
        className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
        {...register('rating', {
          required: 'Please enter your rating',
          valueAsNumber: true,
          min: {
            value: 0,
            message: 'Rating cannot be empty',
          },
          max: {
            value: 5,
            message: 'Rating cannot be more than 5',
          },
        })}
      />
      {errors.rating && <p>{errors.rating.message}</p>}
      <textarea
        placeholder="content"
        className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
        {...register('content', {
          required: 'Please enter your review description',
        })}
      />
      {errors.content && <p>{errors.content.message}</p>}
      <div className="mb-10">
        <button
          className="border-primary w-full cursor-pointer rounded-md border bg-primary py-3 px-5 text-base text-white transition bg-purple-500 hover:bg-opacity-90"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
