import { client } from "../ServiceInstance";
import { IResponse, Util } from "../Util";
import { CharactersResult, GetCharactersProps } from "./Character.type";

async function getCharacters(
  props: GetCharactersProps,
): Promise<IResponse<CharactersResult>> {
  const { page } = props;

  const requestConfig = {
    method: "GET",
    url: `/character/`,
    headers: {},
    params: {
      page,
    },
  };

  try {
    const { data, status } = await client(requestConfig);

    return {
      ...Util.responseHandler({ status: status }),
      res: data,
    };
  } catch (err) {
    return Util.errorHandling(err, requestConfig);
  }
}

export const CharacterService = {
  getCharacters,
};
