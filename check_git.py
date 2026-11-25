import subprocess
import os

repo_path = r"C:\Users\suryansh\Desktop\h2s\DISEASE-PREDICTION-QML"

# Check git status
print("=== git status ===")
result = subprocess.run(['git', 'status'], cwd=repo_path, capture_output=True, text=True)
print(result.stdout)
if result.stderr:
    print("STDERR:", result.stderr)

print("\n=== git diff --name-only ===")
result = subprocess.run(['git', 'diff', '--name-only'], cwd=repo_path, capture_output=True, text=True)
print(result.stdout)

print("\n=== git log --oneline -5 ===")
result = subprocess.run(['git', 'log', '--oneline', '-5'], cwd=repo_path, capture_output=True, text=True)
print(result.stdout)

print("\n=== Check if preprocessor.pkl is tracked ===")
result = subprocess.run(['git', 'ls-files', 'backend/artifacts/preprocessor.pkl'], cwd=repo_path, capture_output=True, text=True)
print(result.stdout)
if result.stderr:
    print("STDERR:", result.stderr)

print("\n=== Check git diff for preprocessor.pkl ===")
result = subprocess.run(['git', 'diff', 'backend/artifacts/preprocessor.pkl'], cwd=repo_path, capture_output=True, text=True)
print("Exit code:", result.returncode)
if result.stdout:
    print("STDOUT:", result.stdout[:500])
if result.stderr:
    print("STDERR:", result.stderr[:500])