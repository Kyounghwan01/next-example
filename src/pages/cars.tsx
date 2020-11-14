import { Grid } from "@material-ui/core";
import deepEqual from "fast-deep-equal";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import { useState } from "react";
import useSWR from "swr";
import Search from ".";
import { CarModel } from "../../api/Car";
import { CarCard } from "../components/CarCard";
import { CarPagination } from "../components/CarPagination";
import { getMakes, Make } from "../database/getMarkes";
import { getModels, Model } from "../database/getModels";
import { getPaginatedCars } from "../database/getPaginatedCars";
import { getAsString } from "../getAsString";

export interface CarsListProps {
  makes: Make[];
  models: Model[];
  cars: CarModel[];
  totalPages: number;
}

export default function CarsList({
  makes,
  models,
  cars,
  totalPages
}: CarsListProps) {
  const { query } = useRouter();
  const [serverQuery] = useState(query);

  const { data } = useSWR("/api/cars?" + stringify(query), {
    // 15초 이내 이전에 했던 api 주소 요청시 캔슬함
    dedupingInterval: 15000,
    // initialData이 없다면 api 쏜다 initialData이 있다면 api 쏘지 않고 들어온 값으로 치환됨
    // initialData을 활용하면 맨 처음 getServerSideProps를 통해 api 호출하고, useSWR를 통해 api를 호출하는 동일한 api를 2번 중복호출하는 로직을 막을수있다.
    initialData: deepEqual(query, serverQuery)
      ? { cars, totalPages }
      : undefined
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={3} lg={2}>
        <Search singleColumn makes={makes} models={models} />
      </Grid>
      <Grid container item xs={12} sm={7} md={9} lg={10} spacing={3}>
        <Grid item xs={12}>
          {/* 맨처음 페이지에 진입시 data가 없지만, getServerSideProps에 의해 추후 data는 채워짐 */}
          <CarPagination totalPages={data?.totalPages} />
        </Grid>
        {(data?.cars || []).map(car => (
          <Grid key={car.id} item xs={12} sm={6}>
            <CarCard car={car} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <CarPagination totalPages={data?.totalPages} />
        </Grid>
      </Grid>
    </Grid>
  );
}

// getServerSideProps이 값은 컴포넌트를 import 시킴과 별개로 각 컴포넌트마다 독립적으로 정의해줘야함
// 같은 로직이라 할지라도 다른 컴포넌트라면 import한 컴포넌트의 getServerSideProps 상속 받지 않음

export const getServerSideProps: GetServerSideProps<CarsListProps> = async ctx => {
  const make = getAsString(ctx.query.make);

  const [makes, models, pagination] = await Promise.all([
    getMakes(),
    getModels(make),
    getPaginatedCars(ctx.query)
  ]);

  return {
    props: {
      makes,
      models,
      cars: pagination.cars,
      totalPages: pagination.totalPages
    }
  };
};
