import { useTranslation } from 'next-i18next';
import Button from '@components/ui/button';
import { useUI } from '@contexts/ui.context';

interface HeaderProps {
  pageSubHeader?: string;
  pageHeader: string;
  layout?: 'modal' | 'page';
}

const EmailVerifiedHeader: React.FC<HeaderProps> = ({
  pageSubHeader = 'text-page-explore',
  pageHeader = 'text-page-header',
  layout,
}) => {
  const { t } = useTranslation('common');
  const { setModalView, openModal, closeModal } = useUI();

  const emailVerified = () => {
    if (layout === 'modal') {
      setModalView('LOGIN_VIEW');
    }
    return openModal();
  };
  return (
    <>
      <div
        className='flex justify-center p-6 md:p-10 2xl:p-8 relative bg-no-repeat bg-center bg-cover'
        style={
          {
            //   backgroundImage: "url(/assets/images/user-dashboard/user-banner.jpg)",
          }
        }>
        <div className='absolute top-0 ltr:left-0 rtl:right-0 bg-white w-full h-full opacity-50 transition-opacity duration-500 group-hover:opacity-80' />
        <div className='w-full flex items-center justify-center relative z-10 py-10 md:py-14 lg:py-20 xl:py-24 2xl:py-32'>
          <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-blue text-center'>
            {t(`${pageHeader}`)}
            <span className='font-satisfy block font-normal mb-3 mt-4'>
              <Button
                onClick={emailVerified}
                className='h-11 md:h-12 mt-1.5 bg-blue hover:border-blue hover:transition hover:bg-white hover:text-black hover:border-2 rounded'>
                Login Here
              </Button>
            </span>
          </h2>
        </div>
      </div>
    </>
  );
};

export default EmailVerifiedHeader;
