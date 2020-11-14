This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## filters based on url queryString with formilk

- url을 통해 들어온 값이 실제 렌더링 값에 반영됨
- useRouter의 query 사용

```ts
const { query } = useRouter();

const initialValues = {
  make: query.make || "all",
  model: query.model || "all",
  minPrice: query.minPrice || "all",
  maxPrice: query.maxPrice || "all"
};
```

- getServerSideProps이용하여 기존에 들어와야할 값을 먼저 가져옴

```ts
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const makes = await getMakes();
  return { props: { makes } };
};
```

## Dynamic Dropdown using Formik and SWR

- swr이용 selection 바뀌면 api 호출

## pagenation with filters for the list of cars

- ssr에서 페이지네이션

## shallow link 이동으로 getInitalProps가 작동안함으로 내부 반응형 데이터가 변하지 않음

- swr을 하기전 api를 만듬, api - cars.ts
- api 에서는 진짜 await axios를 해서 값을 받아와서 브라우저의 클라이언트로 res를 보내줘야함
- res보내면 프론트에서는 swr을 이용해서 값 핸들링 `const {data} = useSWR('/api/cars')`
