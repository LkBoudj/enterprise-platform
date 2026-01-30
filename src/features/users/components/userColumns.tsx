import { useMemo } from "react";
import { IconPhone, IconMail, IconBuilding, IconMapPin } from "@tabler/icons-react";
import { DataTableColumn } from "mantine-datatable";
import { Avatar, Badge, Group, Menu, Text } from "@mantine/core";
import { ColumnOption } from "@/components/ui/globaDataTable/ColumnSelector";
import { GlobalActionMenu } from "@/components/ui/globaDataTable/GlobalActionMenu";
import { UserType } from "../validation/user.schema"; // ✅ new type

// optional: color for role / gender
const ROLE_COLORS: Record<string, string> = {
  admin: "red",
  moderator: "yellow",
  user: "blue",
};

const GENDER_COLORS: Record<string, string> = {
  male: "blue",
  female: "pink",
};

const userColumnOptions: ColumnOption[] = [
  { value: "id", label: "ID" },
  { value: "userInfo", label: "User Info" }, // avatar + name + username
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "role", label: "Role" },
  { value: "gender", label: "Gender" },
  { value: "age", label: "Age" },
  { value: "location", label: "Location" }, // city/country
  { value: "company", label: "Company" },   // company name/title
  { value: "birthDate", label: "Birth Date" },
];

interface UseUserColumnsProps {
  visibleColumns: string[];
  onView?: (user: UserType) => void;
  onEdit?: (user: UserType) => void;
  onDelete?: (user: UserType) => void;
}

export const useUserColumns = ({ visibleColumns, onView, onEdit, onDelete }: UseUserColumnsProps) => {
  const columns: DataTableColumn<UserType>[] = useMemo(() => {
    return [
      {
        accessor: "id",
        title: "ID",
        hidden: !visibleColumns.includes("id"),
        sortable: true,
        width: 80,
      },

      {
        accessor: "userInfo",
        title: "User",
        hidden: !visibleColumns.includes("userInfo"),
        sortable: true, // sorting will rely on accessor string; if you need custom, handle server-side
        render: (u) => {
          const fullName = `${u.firstName} ${u.lastName}`.trim();
          return (
            <Group gap="sm" wrap="nowrap">
              <Avatar src={u.image} alt={fullName} radius="xl" size="sm">
                {u.firstName?.charAt(0)?.toUpperCase()}
              </Avatar>

              <div style={{ minWidth: 0 }}>
                <Text size="sm" fw={600} truncate>
                  {fullName || "-"}
                </Text>
                <Text size="xs" c="dimmed" truncate>
                  @{u.username}
                </Text>
              </div>
            </Group>
          );
        },
      },

      {
        accessor: "email",
        title: "Email",
        hidden: !visibleColumns.includes("email"),
        sortable: true,
        render: ({ email }) => (
          <Group gap={6} wrap="nowrap" c="dimmed">
            <IconMail size={14} />
            <Text size="sm" truncate>
              {email}
            </Text>
          </Group>
        ),
      },

      {
        accessor: "phone",
        title: "Phone",
        hidden: !visibleColumns.includes("phone"),
        render: ({ phone }) => (
          <Group gap={6} wrap="nowrap" c="dimmed">
            <IconPhone size={14} />
            <Text size="sm">{phone || "-"}</Text>
          </Group>
        ),
      },

      {
        accessor: "role",
        title: "Role",
        hidden: !visibleColumns.includes("role"),
        sortable: true,
        width: 120,
        render: ({ role }) =>
          role ? (
            <Badge color={ROLE_COLORS[role] || "gray"} variant="light" size="sm">
              {role}
            </Badge>
          ) : (
            <Text c="dimmed" size="sm">
              -
            </Text>
          ),
      },

      {
        accessor: "gender",
        title: "Gender",
        hidden: !visibleColumns.includes("gender"),
        sortable: true,
        width: 120,
        render: ({ gender }) =>
          gender ? (
            <Badge color={GENDER_COLORS[gender] || "gray"} variant="light" size="sm">
              {gender}
            </Badge>
          ) : (
            <Text c="dimmed" size="sm">
              -
            </Text>
          ),
      },

      {
        accessor: "age",
        title: "Age",
        hidden: !visibleColumns.includes("age"),
        sortable: true,
        width: 90,
        render: ({ age }) => <Text size="sm">{typeof age === "number" ? age : "-"}</Text>,
      },

      {
        accessor: "location",
        title: "Location",
        hidden: !visibleColumns.includes("location"),
        sortable: false,
        render: (u) => {
          const city = u.address?.city;
          const country = u.address?.country;
          const value = [city, country].filter(Boolean).join(", ");
          return (
            <Group gap={6} wrap="nowrap" c="dimmed">
              <IconMapPin size={14} />
              <Text size="sm" truncate>
                {value || "-"}
              </Text>
            </Group>
          );
        },
      },

      {
        accessor: "company",
        title: "Company",
        hidden: !visibleColumns.includes("company"),
        sortable: false,
        render: (u) => {
          const name = u.company?.name;
          const title = u.company?.title;
          return (
            <Group gap={6} wrap="nowrap" c="dimmed">
              <IconBuilding size={14} />
              <div style={{ minWidth: 0 }}>
                <Text size="sm" truncate>
                  {name || "-"}
                </Text>
                {title ? (
                  <Text size="xs" c="dimmed" truncate>
                    {title}
                  </Text>
                ) : null}
              </div>
            </Group>
          );
        },
      },

      {
        accessor: "birthDate",
        title: "Birth Date",
        hidden: !visibleColumns.includes("birthDate"),
        sortable: true,
        width: 140,
        render: (u) => {
          if (!u.birthDate) return <Text c="dimmed">-</Text>;
          // DummyJSON date sometimes "1996-5-30" => safe parse
          const d = new Date(u.birthDate);
          if (Number.isNaN(d.getTime())) return <Text c="dimmed">-</Text>;
          return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).format(d);
        },
      },

      {
        accessor: "actions",
        title: "",
        width: 60,
        textAlign: "right",
        pinned: "right",
        render: (user) => (
          <GlobalActionMenu
            onView={() => onView?.(user)}
            onEdit={() => onEdit?.(user)}
            onDelete={() => onDelete?.(user)}
          >
            {/* ضع actions تخص users هنا */}
            <Menu.Divider />
          </GlobalActionMenu>
        ),
      },
    ];
  }, [visibleColumns, onView, onEdit, onDelete]);

  return { columns, allColumns: userColumnOptions };
};
