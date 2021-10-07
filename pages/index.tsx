import Header from '../src/components/Header';
import Image from 'next/dist/client/image';

function Home() {
  return (
    <>
      <Header notSignedIn={true} />
      <div className='m-auto w-5/6 justify-around flex flex-col sm:w-11/12 sm:flex-row'>
        <div className='mt-10 space-y-2 lg:p-20 md:p-18  lg:w-1/2 sm:w-full'>
          <p className='text-blue text-4xl font-semibold font-mono tracking-wider'>
            Enter the Product Link
          </p>
          <p className='text-blue text-4xl font-semibold font-mono tracking-wider'>
            Get Your Price Drop Email Alert
          </p>
          <p className='text-middlegrey text-2xl font-bold font-mono tracking-wide'>
            Trackky is here to help you save the money,
          </p>
          <p className='text-middlegrey text-2xl font-bold font-mono tracking-wide'>
            enjoy goodies at the right time.
          </p>
          <p className='font-mono font-semibold tracking-wider'>
            Current Range:
          </p>
          <p>Chemist Warehouse</p>
        </div>
        <div className='m-auto p-3.5'>
          <Image
            src='/analyticsIcon.svg'
            alt='intro image'
            width={350}
            height={350}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
