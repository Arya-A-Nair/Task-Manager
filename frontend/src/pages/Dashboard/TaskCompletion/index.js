import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

import { Grid, Box } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckIcon from "@mui/icons-material/Check";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import formatHttpApiError from "src/helpers/formatHttpApiError";
import getCommonOptions from "src/helpers/axios/getCommonOptions";
import StatCard from "./StatCard";

export default function TaskCompletion() {
  const [isLoading, setIsLoading] = useState(false);
  const [completionStats, setCompletionStats] = useState({
    completed: null,
    pending: null,
  });
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/dashboard/tasks-completion", getCommonOptions())
      .then((res) => {
        const { data } = res;
        if (data) {
          const stats = {};
          data.forEach((d) => {
            if (d.completed === true) {
              stats.completed = d.count;
              return;
            }
            if (d.completed === false) {
              stats.pending = d.count;
            }
          });
          setCompletionStats(stats);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        const formattedError = formatHttpApiError(err);
        enqueueSnackbar(err);
        setIsLoading(false);
      });
  }, [enqueueSnackbar, setIsLoading]);


  const totalTasksCount=(completionStats.pending || 0)+(completionStats.completed || 0)

  return (
    <Box
      sx={{
        flexGrow: 1,
        mb: (theme) => theme.spacing(2),
      }}
    >
      <Grid container spacing={3}>
        <StatCard
          title="Total Tasks"
          value={totalTasksCount}
          loading={false}
          icon={<AssignmentIcon fontSize="small" />}
        ></StatCard>
        <StatCard
          title="Tasks Due"
          value={completionStats.pending}
          loading={false}
          icon={<AssignmentLateIcon fontSize="small" />}
        ></StatCard>
        <StatCard
          title="Tasks Completed"
          value={completionStats.completed}
          loading={false}
          icon={<CheckIcon fontSize="small" />}
        ></StatCard>
      </Grid>
    </Box>
  );
}
