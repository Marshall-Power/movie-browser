import { Header } from '../../components/header/Header';

export function Home({ initialData }: any) {
  console.log(initialData);
  return (
    <>
      <Header />
      <h1>Home</h1>
    </>
  );
}
