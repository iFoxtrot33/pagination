import type { Meta, StoryObj } from "@storybook/react";
import Pagination, { IPaginationProps } from "./Pagination";

const meta: Meta<IPaginationProps> = {
  title: "Pagination",
  component: Pagination,
};

export default meta;

type Story = StoryObj<IPaginationProps>;

export const DynamicPagination: Story = {
  args: {
    API_URL: "https://jsonplaceholder.typicode.com/photos?_limit=10&_page=",
    TOTAL_COUNT_HEADER: "x-total-count",
    dynamic: true,
  },
};

export const StaticPagination: Story = {
  args: {
    API_URL: "https://jsonplaceholder.typicode.com/photos?_limit=10&_page=",
    TOTAL_COUNT_HEADER: "x-total-count",
    dynamic: false,
  },
};
