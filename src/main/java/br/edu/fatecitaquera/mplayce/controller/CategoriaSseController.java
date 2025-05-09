package br.edu.fatecitaquera.mplayce.controller;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
public class CategoriaSseController {

    private final List<SseEmitter> emissores = new CopyOnWriteArrayList<>();

    @GetMapping("/sse/categoria")
    public SseEmitter streamCategorias() {
        SseEmitter emitter = new SseEmitter();
        emissores.add(emitter);
        emitter.onCompletion(() -> emissores.remove(emitter));
        emitter.onTimeout(() -> emissores.remove(emitter));
        return emitter;
    }

    public void notificarClientes(Object dados) {
        for (SseEmitter emitter : emissores) {
            try {
                emitter.send(SseEmitter.event().name("atualizacao").data(dados));
            } catch (IOException e) {
                emissores.remove(emitter);
            }
        }
    }
}
