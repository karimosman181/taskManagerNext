"use client";

import { I_CardPublic } from "@/models/Card.types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ListItemProps {
  data: I_CardPublic;
  index: number;
}

export const CardItem = ({ data, index }: ListItemProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
