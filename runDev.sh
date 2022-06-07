while getopts b flag
do
    case "${flag}" in
        b) rebuildNodeModules='true';;
    esac
done

echo "Attempt to start PostgreSQL dependancy (Error indicates that PostgreSQL is already running)"
docker run \
  --rm \
  --name postgres \
  -v ~/data:/localtmp \
  -v ~/data/DB/postgres:/var/lib/postgresql/data \
  -p 5432:5432 \
  -d \
  docker.io/postgres:13.3

docker pull ghcr.io/quantifica/node:16-dev

if [ "$rebuildNodeModules" == "true" ]; then
  docker run \
    --rm \
    -it \
    --name document \
    --link postgres \
    -p 81:5000 \
    -v $HOME/.npmrc:/root/.npmrc \
    -v $PWD:/node \
    ghcr.io/quantifica/node:16-dev \
      ash -c "rm -Rf node_modules; \
        rm -f package-lock.json yarn.lock; \
        npm i"
fi

docker run \
  --rm \
  -it \
  --name document \
  --link postgres \
  -p 81:5000 \
  -v $HOME/.npmrc:/root/.npmrc \
  -v $PWD:/node \
  ghcr.io/quantifica/node:16-dev \
    ash
