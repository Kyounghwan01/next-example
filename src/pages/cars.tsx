import { Grid } from "@material-ui/core";
import { PaginationRenderItemParams } from "@material-ui/lab";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import Search from ".";
import { CarModel } from "../../api/Car";
import { getMakes, Make } from "../database/getMarkes";
import { getModels, Model } from "../database/getModels";
import { getPaginatedCars } from "../database/getPaginatedCars";
import { getAsString } from "../getAsString";

export default function CarList() {}
