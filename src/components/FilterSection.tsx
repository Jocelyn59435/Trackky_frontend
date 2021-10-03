import { useEffect, useState } from 'react';
import { useGetProductByUserIdLazyQuery } from '../../graphql/generated';
import { ProductInfo } from './ProductInfo';

type FileterSectionProps = {
  userId: string;
};

export function FilterSection(props: FileterSectionProps) {
  const [activeClicked, setActiveClicked] = useState(true);

  const [getProductByUserId, { data, loading, error }] =
    useGetProductByUserIdLazyQuery({
      fetchPolicy: 'network-only', // Used for first execution
      nextFetchPolicy: 'network-only',
    });

  useEffect(() => {
    getProductByUserId({
      variables: {
        userId: props.userId,
        status: activeClicked ? 'active' : 'achieved',
      },
    });
  }, [activeClicked]);

  const unclickedStyle =
    'w-1/4 text-center border-0 border-indigo text-indigo font-bold text-lg hover:bg-indigo hover:text-grey';
  const clickedStyle =
    'w-1/4 text-center border-0 font-bold text-lg bg-indigo text-grey';

  return (
    <div>
      <div className='flex flex-row justify-around'>
        <div
          className={activeClicked ? clickedStyle : unclickedStyle}
          onClick={() => setActiveClicked(true)}
        >
          Active
        </div>
        <div
          className={!activeClicked ? clickedStyle : unclickedStyle}
          onClick={() => setActiveClicked(false)}
        >
          Achieved
        </div>
      </div>

      {data &&
        data?.getProductByUserId.map((p, index) => (
          <ProductInfo product_name={p.product_name} key={index} />
        ))}
    </div>
  );
}
