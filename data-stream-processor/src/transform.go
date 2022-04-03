package src

import (
	"fmt"
	"os/exec"
	"strings"
)

var DslProjectPath = `./dsl`

func Transform(stream string, rules string) (string, error) {
	cmd := exec.Command("python", fmt.Sprintf("%s/main.py", DslProjectPath), stream, rules, fmt.Sprintf("%s/grammar.tx", DslProjectPath))
	out, err := cmd.CombinedOutput()
	result := strings.TrimSpace(string(out))
	if err != nil {
		return result, err
	} else {
		return result, nil
	}
}
