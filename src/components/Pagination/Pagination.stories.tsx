import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Pagination from "./Pagination";

const queryClient = new QueryClient();

const queryPagination: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Pagination />
    </QueryClientProvider>
  );
};

const meta: Meta = {
  title: "Pagination",
  component: queryPagination,
};

export default meta;

type Story = StoryObj;

export const DynamicPagination: Story = {
  args: {},
};
