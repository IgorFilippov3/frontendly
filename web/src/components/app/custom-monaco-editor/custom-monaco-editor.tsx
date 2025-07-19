import { useEffect, useCallback } from "react";
import { Editor, useMonaco } from "@monaco-editor/react";
import { emmetCSS, emmetHTML, emmetJSX } from "emmet-monaco-es";
import { monacoDefaultOptions } from "@/components/app/custom-monaco-editor/constants/monaco-default-options";
import type { editor } from "monaco-editor";
import { getMonacoLanguage } from "./utils/get-monaco-language";

interface CustomMonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  fileName: string;
  theme?: string;
  height?: string | number;
  width?: string | number;
  readOnly?: boolean;
  options?: editor.IStandaloneEditorConstructionOptions;
}

export const CustomMonacoEditor = ({
  value,
  onChange,
  fileName,
  theme = "vs-light",
  height = "100%",
  width = "100%",
  readOnly = false,
  options = {},
}: CustomMonacoEditorProps) => {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      // Disable Javascript validator to avoid conflicts with Typescript
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: false,
      });

      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.Latest,
        allowNonTsExtensions: true,
        moduleResolution:
          monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monaco.languages.typescript.ModuleKind.CommonJS,
        noEmit: true,
        esModuleInterop: true,
        jsx: monaco.languages.typescript.JsxEmit.React,
        reactNamespace: "React",
        allowJs: false,
        checkJs: false,
        typeRoots: ["node_modules/@types"],
        noImplicitAny: false,
        strictNullChecks: false,
        strictFunctionTypes: false,
        noImplicitReturns: false,
        noImplicitThis: false,
      });

      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
        noSuggestionDiagnostics: true,
      });

      monaco.languages.html.htmlDefaults.setOptions({
        format: {
          tabSize: 2,
          insertSpaces: true,
          wrapLineLength: 120,
          unformatted: 'default"',
          contentUnformatted: "pre,code,textarea",
          indentInnerHtml: false,
          preserveNewLines: true,
          maxPreserveNewLines: 2,
          indentHandlebars: false,
          endWithNewline: false,
          extraLiners: "head, body, /html",
          wrapAttributes: "auto",
        },
        suggest: { html5: true, angular1: false, ionic: false },
      });

      monaco.languages.css.cssDefaults.setOptions({
        validate: true,
        lint: {
          compatibleVendorPrefixes: "ignore",
          vendorPrefix: "warning",
          duplicateProperties: "warning",
          emptyRules: "warning",
          importStatement: "ignore",
          boxModel: "ignore",
          universalSelector: "ignore",
          zeroUnits: "ignore",
          fontFaceProperties: "warning",
          hexColorLength: "error",
          argumentsInColorFunction: "error",
          unknownProperties: "warning",
          ieHack: "ignore",
          unknownVendorSpecificProperties: "ignore",
          propertyIgnoredDueToDisplay: "warning",
          important: "ignore",
          float: "ignore",
          idSelector: "ignore",
        },
      });

      emmetHTML(monaco);
      emmetCSS(monaco);
      emmetJSX(monaco, ["javascript", "typescript", "typescriptreact"]);
    }
  }, [monaco]);

  const language: string = getMonacoLanguage(fileName);

  const editorOptions: editor.IStandaloneEditorConstructionOptions = {
    ...monacoDefaultOptions,
    ...options,
    readOnly,
  };

  const handleEditorChange = useCallback(
    (newValue: string | undefined) => {
      if (newValue !== undefined) {
        onChange(newValue);
      }
    },
    [onChange],
  );

  return (
    <Editor
      width={width}
      height={height}
      language={language}
      value={value}
      theme={theme}
      options={editorOptions}
      onChange={handleEditorChange}
    />
  );
};
