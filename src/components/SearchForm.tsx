import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCheckProductPriceByUrlLazyQuery } from '../../graphql/generated';
import { SearchResult } from './SearchResult';

type SearchProductByUrlData = {
  url: string;
};

type SearchFormProps = {
  userId: string;
};

export default function SearchForm(props: SearchFormProps) {
  const [
    checkProductPriceByUrl,
    {
      data: checkPriceQueryData,
      loading: checkPriceQueryLoading,
      error: checkPriceQueryError,
    },
  ] = useCheckProductPriceByUrlLazyQuery();
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    getValues,
  } = useForm<SearchProductByUrlData>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<SearchProductByUrlData> = async (formData) => {
    await checkProductPriceByUrl({
      variables: {
        url: formData.url,
      },
    });
  };

  const formValues = getValues();
  return (
    <>
      <div className='mx-auto lg:w-2/3 md:w-5/6 sm:w-11/12 p-4 '>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-2 '>
            <div className='sm:col-span-3 md:col-span-5 lg:col-span-5'>
              <input
                type='search'
                className='w-full border-darkgrey border-2 rounded-lg h-10 hover:border-indigo focus:bg-transparent'
                placeholder='Please enter your product URL'
                {...register('url', {
                  required: 'This is required.',

                  pattern: {
                    value:
                      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
                    message: 'Invalid product link.',
                  },
                })}
              />
            </div>

            <motion.div
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.8 }}
            >
              {checkPriceQueryLoading ? (
                <div
                  className='w-full
           h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo text-lg text-center font-bold items-center align-middle'
                >
                  <span className= 'm-auto'>Fetching ...</span>
                </div>
              ) : (
                <input
                  disabled={!isDirty || !isValid}
                  type='submit'
                  className='w-full h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo disabled:opacity-50 text-lg font-bold'
                />
              )}
            </motion.div>
          </div>
          <div>
            {errors.url && <p className='text-red'>{errors.url.message}</p>}
            {checkPriceQueryError && (
              <p className='text-red'>{checkPriceQueryError.message}</p>
            )}
          </div>
        </form>
        {checkPriceQueryData && (
          <SearchResult
            userid={props.userId}
            product_image_src={
              checkPriceQueryData?.checkProductPriceByUrl?.product_image_src
            }
            product_name={
              checkPriceQueryData?.checkProductPriceByUrl?.product_name
            }
            product_link={formValues.url}
            original_price={
              checkPriceQueryData?.checkProductPriceByUrl?.original_price
            }
          />
        )}
      </div>
    </>
  );
}
