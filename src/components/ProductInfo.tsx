import Image from 'next/dist/client/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUpdateDesiredPriceMutation } from '../../graphql/generated';

type ProductInfoProps = {
  product_name: string;
  product_link: string;
  product_image_src: string;
  original_price: number;
  current_price: number;
  desired_price: number;
  user_id: string;
  id: string;
};

type SearchFormProps = {
  desired_price: string;
};

export function ProductInfo(props: ProductInfoProps) {
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm<SearchFormProps>({ mode: 'onChange' });

  const [
    updateDesiredPriceMutation,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useUpdateDesiredPriceMutation();

  const onSubmit: SubmitHandler<SearchFormProps> = async (formData) => {
    await updateDesiredPriceMutation({
      variables: {
        desired_price: parseFloat(formData.desired_price),
        user_id: props.user_id,
        id: props.id,
      },
    });
  };
  return (
    <div className='border-b-2 border-bordergrey p-2'>
      <div className='w-1/2 m-auto'>
        <a className='cursor-pointer' href={props.product_link}>
          <Image width={200} height={200} src={props.product_image_src} />
        </a>
      </div>
      <div className='grid grid-cols-2 '>
        <div className='h-20 col-span-2 text-lg'>{props.product_name}</div>
        <div className='font-bold'>Original Price:</div>
        <div>{props.original_price}</div>
        <div className='font-bold'>Current Price:</div>
        <div>{props.current_price}</div>
        <div className='font-bold'>Desired Price:</div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              defaultValue={props.desired_price}
              className='w-full border-darkgrey border-2 rounded-lg  hover:border-indigo focus:bg-transparent'
              type='number'
              {...register('desired_price', {
                maxLength: {
                  value: 5,
                  message: 'Maximum length is 5 digits.',
                },
                validate: (value) => parseFloat(value) < props.original_price,
              })}
            />

            {errors.desired_price && (
              <p className='text-red'>{errors.desired_price.message}</p>
            )}
            <div className='mt-4'>
              {updateLoading ? (
                <div className='w-full text-center h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo text-lg font-bold'>
                  <p className='m-auto'>Loading...</p>
                </div>
              ) : (
                <button
                  disabled={!isDirty || !isValid}
                  className='w-full text-center h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo disabled:opacity-50 text-lg font-bold'
                  type='submit'
                >
                  Update
                </button>
              )}
            </div>
            {updateError && <p className='text-red'>{updateError.message}</p>}
            {updateData && <p>Price updated.</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
