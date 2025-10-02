import { getLayout } from '@components/layout/layout';
import Container from '@components/ui/container';
import Link from '@components/ui/link';

export default function EmailVerifiedPage() {
  return (
    <Container>
      <div className='flex flex-col items-center justify-center py-16 text-center'>
        <h1 className='text-2xl font-semibold mb-4'>Email verified successfully</h1>
        <p className='text-body mb-8'>
          Your email has been verified. You can now sign in and continue.
        </p>
        <div className='flex gap-4'>
          <Link href='/' className='inline-flex px-5 py-2.5 bg-accent text-white rounded'>
            Go to Home
          </Link>
          <Link href='/signin' className='inline-flex px-5 py-2.5 border border-accent rounded'>
            Sign in
          </Link>
        </div>
      </div>
    </Container>
  );
}

EmailVerifiedPage.getLayout = getLayout;

