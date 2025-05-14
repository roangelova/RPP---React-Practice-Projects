import { signInAction } from "../_lib/actions";

function SignInButton() {
  return (
    <form action={signInAction}>
    <button className='flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium'>
      <img
        src='https://authjs.dev/img/providers/google.svg'
        alt='Google logo'
        height='24'
        width='24'
        />
      <span>Continue with Google</span>
    </button>
        </form>
  );
}

export default SignInButton;

//we need to create a serverAction to create interactivity, because this is a static page and cant have the onClick;