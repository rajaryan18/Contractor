import yaml, json, os, shutil

def update_frontend():
    copy_folders_to_frontend("../build", "../frontend/src/chain-info")
    with open("brownie-config.yaml", "r") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)
        with open("../frontend/src/brownie-config.json", "w") as bc:
            json.dump(config_dict, bc)
    print("Frontend Updated")

def copy_folders_to_frontend(src, dest):
    print("Copying File")
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)

def main():
    update_frontend()