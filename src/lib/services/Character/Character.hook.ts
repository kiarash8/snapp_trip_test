import { useQuery } from "@lib/hooks";
import { IResponse } from "../Util";
import { CharactersResult, GetCharactersProps } from "./Character.type";
import { CharacterService } from "./Character.service";

function useGetCharacters(props: GetCharactersProps) {
  const { page } = props;

  return useQuery<IResponse<CharactersResult>>(
    ["characters", page],
    () => CharacterService.getCharacters({ page }),
    {},
  );
}

export const CharacterHook = {
  getCharacters: useGetCharacters,
};
