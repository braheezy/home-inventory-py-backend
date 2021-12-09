#/bin/bash -e

# Create python virtual environment and activate it.
python -m venv ./venv || echo "failed to make venv"
source ./venv/bin/activate
echo "  *********************"
echo "  Python virtual env created"
echo "  *********************"

# Install python dependencies.
pip install -r app/requirements.txt || echo "failed to pip install py reqs"
echo "  *********************"
echo "  Python dependencies installed"
echo "  *********************"
