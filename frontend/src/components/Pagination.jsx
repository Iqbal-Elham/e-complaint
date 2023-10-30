import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const Pagination = ({
  paginationState,
  currentPage,
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage,
}) => {
  const { t } = useTranslation();

  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "blue",
    onClick: () => {
      setCurrentPage(index);
    },
  });

  const next = () => {
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex items-center gap-4 justify-center">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={!paginationState?.hasPrev}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" /> {t("previous")}
      </Button>
      <div className="flex items-center gap-2">
        {Array.from(
          Array(Math.ceil(paginationState.count / itemsPerPage)).keys()
        ).map((number) => (
          <IconButton key={number} {...getItemProps(number + 1)}>
            {number + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={!paginationState?.hasNext}
      >
        {t("next")}
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
