import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

type Props = {
  onChange: (value: string) => void;
  sortOptions: string;
};

const SORT_OPTIONS = [
  {
    label: "Khớp nhất",
    value: "bestMatch",
  },
  {
    label: "Phí giao hàng",
    value: "deliveryPrice",
  },
  {
    label: "Thời gian giao hàng",
    value: "estimatedDeliveryTime",
  },
];
const SortOptionDropdown = ({ onChange, sortOptions }: Props) => {
    const selectedSortLabel = SORT_OPTIONS.find((option) => option.value === sortOptions)?.label || SORT_OPTIONS[0].label
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="outline" className="w-full">
                    Sắp xếp theo: {selectedSortLabel}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {SORT_OPTIONS.map((option) => (
                    <DropdownMenuItem className="cursor-pointer" onClick={() => onChange(option.value)}>
                        {option.label}
                    </DropdownMenuItem>
                ))} 
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default SortOptionDropdown;
