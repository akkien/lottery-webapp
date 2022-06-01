export default function NotiContent(message: string, hash: string) {
  return (
    <span>
      {message}{" "}
      <a
        href={`https://ropsten.etherscan.io/tx/${hash}`}
        target="_blank"
        rel="noreferrer"
      >
        {hash.substr(0, 10)}
      </a>
    </span>
  );
}
