export const ANGULAR_TEMPLATE = {
  files: {
    "/src/main.ts": {
      code: `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));`,
    },
    "/src/app/app.component.ts": {
      code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <h1>Default</h1>
  \`,
})
export class AppComponent {
  title = 'default';
}`,
    },
    "/src/app/app.module.ts": {
      code: `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }`,
    },
    "/public/index.html": {
      code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Angular 18 App</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <app-root></app-root>
</body>
</html>`,
    },
    "/package.json": {
      code: JSON.stringify(
        {
          name: "angular18-minimal",
          version: "1.0.0",
          scripts: {
            dev: "ng serve",
            build: "ng build",
            start: "ng serve",
          },
          dependencies: {
            "@angular/animations": "^18.0.0",
            "@angular/common": "^18.0.0",
            "@angular/compiler": "^18.0.0",
            "@angular/core": "^18.0.0",
            "@angular/forms": "^18.0.0",
            "@angular/platform-browser": "^18.0.0",
            "@angular/platform-browser-dynamic": "^18.0.0",
            "@angular/router": "^18.0.0",
            rxjs: "~7.8.0",
            tslib: "^2.3.0",
            "zone.js": "~0.14.0",
          },
          devDependencies: {
            "@angular-devkit/build-angular": "^18.0.0",
            "@angular/cli": "^18.0.0",
            "@angular/compiler-cli": "^18.0.0",
            typescript: "~5.4.0",
          },
        },
        null,
        2,
      ),
    },
    "/angular.json": {
      code: JSON.stringify(
        {
          $schema: "./node_modules/@angular/cli/lib/config/schema.json",
          version: 1,
          newProjectRoot: "projects",
          projects: {
            "my-app": {
              projectType: "application",
              schematics: {},
              root: "",
              sourceRoot: "src",
              prefix: "app",
              architect: {
                build: {
                  builder: "@angular-devkit/build-angular:browser",
                  options: {
                    outputPath: "dist/my-app",
                    index: "public/index.html",
                    main: "src/main.ts",
                    polyfills: [],
                    tsConfig: "tsconfig.app.json",
                    assets: [],
                    styles: [],
                    scripts: [],
                  },
                },
                serve: {
                  builder: "@angular-devkit/build-angular:dev-server",
                  options: {},
                },
              },
            },
          },
        },
        null,
        2,
      ),
    },
    "/tsconfig.json": {
      code: JSON.stringify(
        {
          compileOnSave: false,
          compilerOptions: {
            outDir: "./dist/out-tsc",
            forceConsistentCasingInFileNames: true,
            strict: true,
            noImplicitOverride: true,
            noPropertyAccessFromIndexSignature: true,
            noImplicitReturns: true,
            noFallthroughCasesInSwitch: true,
            skipLibCheck: true,
            esModuleInterop: true,
            sourceMap: true,
            declaration: false,
            experimentalDecorators: true,
            moduleResolution: "bundler",
            importHelpers: true,
            target: "ES2022",
            module: "ES2022",
            useDefineForClassFields: false,
            lib: ["ES2022", "dom"],
          },
          angularCompilerOptions: {
            enableI18nLegacyMessageIdFormat: false,
            strictInjectionParameters: true,
            strictInputAccessModifiers: true,
            strictTemplates: true,
          },
        },
        null,
        2,
      ),
    },
    "/tsconfig.app.json": {
      code: JSON.stringify(
        {
          extends: "./tsconfig.json",
          compilerOptions: {
            outDir: "./out-tsc/app",
            types: [],
          },
          files: ["src/main.ts", "src/app/app.module.ts"],
          include: ["src/**/*.d.ts"],
        },
        null,
        2,
      ),
    },
  },
  customSetup: {
    dependencies: {
      "@angular/animations": "^18.0.0",
      "@angular/common": "^18.0.0",
      "@angular/compiler": "^18.0.0",
      "@angular/core": "^18.0.0",
      "@angular/forms": "^18.0.0",
      "@angular/platform-browser": "^18.0.0",
      "@angular/platform-browser-dynamic": "^18.0.0",
      "@angular/router": "^18.0.0",
      rxjs: "~7.8.0",
      tslib: "^2.3.0",
      "zone.js": "~0.14.0",
    },
    devDependencies: {
      "@angular-devkit/build-angular": "^18.0.0",
      "@angular/cli": "^18.0.0",
      "@angular/compiler-cli": "^18.0.0",
      typescript: "~5.4.0",
    },
    entry: "/src/main.ts",
  },
};
