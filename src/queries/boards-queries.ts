import { queryOptions } from "@tanstack/react-query";
import { getBoardsByOrganizationId } from "@/api/boards/get-boards-by-organization-id";

export const boardsByOrganizationIdQueryOptions = (organizationId: string) =>
  queryOptions({
    queryKey: ["boards", organizationId],
    queryFn: () => getBoardsByOrganizationId({ organizationId }),
  });
