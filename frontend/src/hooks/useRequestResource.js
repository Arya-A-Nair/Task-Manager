import { useCallback, useState, useContext } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import formatHttpApiError from "src/helpers/formatHttpApiError";
import { LoadingOverlayResourceContext } from "src/components/LoadingOverlayResource";
import getCommonOptions from "src/helpers/axios/getCommonOptions";

export default function useRequestResource({ endpoint, resourceLabel }) {
  const [resourceList, setResourceList] = useState({
    results: [],
  });
  const [resource, setResource] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState(null);
  const loadingOverlay = useContext(LoadingOverlayResourceContext);
  const { setLoading } = loadingOverlay;

  const handleRequestResourceError = useCallback((err) => {
    const formattedError = formatHttpApiError(err);
    setLoading(false);
    setError(formattedError);
    enqueueSnackbar(formattedError);
  });

  const getResourceList = useCallback(() => {
    const options = getCommonOptions();
    setLoading(true);
    axios
      .get(`api/${endpoint}/`, options)
      .then((res) => {
        setResourceList({
          results: res.data,
        });
        setLoading(false);
      })
      .catch((err) => {
        handleRequestResourceError(err);
      });
  }, [endpoint]);

  const addResource = useCallback(
    (values, successCallback) => {
      setLoading(true);
      axios
        .post(`/api/${endpoint}/`, values, getCommonOptions())
        .then(() => {
          enqueueSnackbar(`${resourceLabel} added`);
          if (successCallback) {
            successCallback();
          }
          setLoading(false);
        })
        .catch((e) => {
          handleRequestResourceError(e);
        });
    },
    [endpoint, enqueueSnackbar]
  );

  const getResource = useCallback(
    (id) => {
      setLoading(true);
      axios
        .get(`/api/${endpoint}/${id}/`,getCommonOptions())
        .then((res) => {
          setLoading(false);

          const { data } = res;
          setResource(data);
        })
        .catch((e) => {
          handleRequestResourceError(e);
        });
    },
    [endpoint]
  );

  const updateResource = useCallback(
    (id, values, successCallback) => {
      setLoading(true);
      axios
        .patch(`/api/${endpoint}/${id}/`, values, getCommonOptions())
        .then(() => {
          setLoading(false);

          enqueueSnackbar(`${resourceLabel} Updated`);
          if (successCallback) {
            successCallback();
          }
        })
        .catch((e) => {
          handleRequestResourceError(e);
        });
    },
    [endpoint]
  );

  const deleteResource = useCallback(
    (id) => {
      setLoading(true);
      axios
        .delete(`/api/${endpoint}/${id}`,getCommonOptions())
        .then(() => {
          setLoading(false);

          enqueueSnackbar(`${resourceLabel} Deleted`);
          const newResourceList = {
            results: resourceList.results.filter((r) => {
              return r.id !== id;
            }),
          };
          setResourceList(newResourceList);
        })
        .catch((err) => {
          handleRequestResourceError(err);
        });
    },
    [endpoint, resourceList]
  );

  return {
    resourceList,
    getResourceList,
    addResource,
    getResource,
    resource,
    updateResource,
    deleteResource,
  };
}
