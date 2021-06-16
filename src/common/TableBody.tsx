import React from "react";
import convertISODateToString from "../utils/convertISODateToString";

type TableBodyProps = {
  data: ArtistType[];
  isLoaded: boolean;
  handleClick: (artist: string) => void;
};

type ArtistType = {
  _id: string;
  Artist: string;
  Birthday: string;
  ProfileImage: string;
  Horoscope: string;
};

const TableBody: React.FC<TableBodyProps> = ({
  data,
  isLoaded,
  handleClick,
}: TableBodyProps): JSX.Element => {
  /* When data has not been loaded, show a loading spinner */
  const loadedDiv = (
    <tbody>
      <tr>
        <td></td>
        <td>
          <div className="loader"></div>
        </td>
      </tr>
    </tbody>
  );

  return !isLoaded ? (
    loadedDiv
  ) : (
    <tbody>
      {data.map((item: ArtistType) => (
        <tr
          key={item._id}
          onClick={() => handleClick(item.Artist)}
          title={"Click to view " + item.Artist + "'s Profile."}
        >
          <td>
            <img
              src={item.ProfileImage}
              className="mx-auto td-image"
              alt={item.Artist}
            />
          </td>

          <td>{item.Artist}</td>
          <td>{convertISODateToString(item.Birthday)}</td>
          <td>{item.Horoscope}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
